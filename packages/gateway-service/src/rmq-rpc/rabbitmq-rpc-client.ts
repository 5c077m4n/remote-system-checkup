import * as amqp from 'amqplib';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

export class RMQRPCClient extends ClientProxy {
	private server: amqp.Connection = null;
	private channel: amqp.Channel = null;

	private handleMessage(
		message,
		server,
		callback: (err, result, disposed?: boolean) => void,
	) {
		const { content } = message;
		const { err, response, disposed } = JSON.parse(content.toString());
		if (disposed) server.close();

		callback(err, response, disposed);
	}

	constructor(private readonly host: string, private readonly queue: string) {
		super();
	}

	protected publish(
		packet: ReadPacket<any>,
		callback: (packet: WritePacket<any>) => void,
	): Function {
		return function() {};
	}
	protected async dispatchEvent<T = any>(
		packet: ReadPacket<any>,
	): Promise<T> {
		return;
	}

	protected async sendSingleMessage(
		messageObj,
		callback: (err, result, disposed?: boolean) => void,
	) {
		const server = await amqp.connect(this.host);
		const channel = await server.createChannel();

		channel.assertQueue(this.queue, { durable: false });

		channel.consume(this.queue, message =>
			this.handleMessage(message, server, callback),
		);
		channel.sendToQueue(
			this.queue,
			Buffer.from(JSON.stringify(messageObj)),
		);
	}

	async connect(): Promise<any> {
		this.server = await amqp.connect(this.host);
		this.channel = await this.server.createChannel();
		await this.channel.assertQueue(this.queue, {
			durable: false,
		});
		await this.channel.prefetch(1);
		await this.channel.consume(this.queue, this.handleMessage.bind(this));
	}
	close(): void {
		if (this.channel) this.channel.close();
		if (this.server) this.server.close();
	}
}
