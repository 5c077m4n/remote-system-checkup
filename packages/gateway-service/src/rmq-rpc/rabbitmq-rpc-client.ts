import * as amqp from 'amqplib';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

export class RMQRPCClient extends ClientProxy {
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
	): Function {}
	protected async dispatchEvent<T = any>(
		packet: ReadPacket<any>,
	): Promise<T> {}

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

	connect(): Promise<any> {}
	close(): void {}
}
