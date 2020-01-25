import * as amqp from 'amqplib';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export class RMQRPCServer extends Server implements CustomTransportStrategy {
	private server: amqp.Connection = null;
	private channel: amqp.Channel = null;

	private async init() {
		this.server = await amqp.connect(this.host);
		this.channel = await this.server.createChannel();
		this.channel.prefetch(1);
		this.channel.assertQueue(this.queue, { durable: false });
	}

	private async handleMessage(message) {
		const { content } = message;
		const messageObj = JSON.parse(content.toString());

		const handlers = this.getHandlers();
		const pattern = JSON.stringify(messageObj.pattern);
		if (!this.messageHandlers[pattern]) return;

		const handler = this.messageHandlers[pattern];
		const response$ = this.transformToObservable(
			await handler(messageObj.data),
		) as Observable<any>;
		response$ && this.send(response$, data => this.sendMessage(data));
	}

	private sendMessage(msg) {
		const buffer = Buffer.from(JSON.stringify(msg));
		this.channel.sendToQueue(this.queue, buffer, {
			correlationId: msg.properties.correlationId,
		});
	}

	constructor(private readonly host: string, private readonly queue: string) {
		super();
	}

	public async listen(callback: () => void) {
		await this.init();
		this.channel.consume(this.queue, this.handleMessage.bind(this), {
			noAck: true,
		});
	}

	public close() {
		this.channel && this.channel.close();
		this.server && this.server.close();
	}
}
