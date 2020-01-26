import * as amqp from 'amqplib';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export class RMQRPCServer extends Server implements CustomTransportStrategy {
	private server: amqp.Connection = null;
	private channel: amqp.Channel = null;

	private async init(): Promise<void> {
		this.server = await amqp.connect(this.host);
		this.channel = await this.server.createChannel();
		process.once('SIGINT', this.channel.close);
		await this.channel.assertQueue(this.queue, {
			durable: false,
		});
		await this.channel.prefetch(1);
		await this.channel.consume(this.queue, this.handleMessage.bind(this));
	}

	private async handleMessage(msg: amqp.Message): Promise<void> {
		const messageObj = JSON.parse(msg.content.toString());

		const handlers = this.getHandlers();
		const pattern = JSON.stringify(messageObj.pattern);
		if (!handlers.has(pattern)) return;

		const handler = handlers.get(pattern);
		const response$ = this.transformToObservable(
			await handler(msg),
		) as Observable<any>;
		if (response$) {
			this.send(response$, data =>
				this.sendMessage(data as amqp.Message),
			);
		}
	}

	private sendMessage(msg: amqp.Message): void {
		const buffer = Buffer.from(JSON.stringify(msg));
		this.channel.sendToQueue(msg.properties.replyTo, buffer, {
			replyTo: msg.properties.replyTo,
			correlationId: msg.properties.correlationId,
		});
		this.channel.ack(msg);
	}

	constructor(private readonly host: string, private readonly queue: string) {
		super();
	}

	public async listen(callback: () => void): Promise<void> {
		await this.init();
		if (typeof callback === 'function') callback();
	}

	public close(): void {
		if (this.channel) this.channel.close();
		if (this.server) this.server.close();
	}
}
