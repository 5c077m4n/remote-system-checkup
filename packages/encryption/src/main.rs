#[macro_use]
extern crate log;
extern crate env_logger;

mod consts;

use amiquip::{
	Connection, ConsumerMessage, ConsumerOptions, Exchange, QueueDeclareOptions, Result,
};
use consts::{functions, queues};
use env_logger::Env;

fn init_logger() {
	let env = Env::default()
		.filter_or("MY_LOG_LEVEL", "info")
		.write_style_or("MY_LOG_STYLE", "always");
	env_logger::init_from_env(env);
}

fn main() -> Result<()> {
	init_logger();
	let mut connection = Connection::insecure_open("amqp://guest:guest@localhost:5672")?;
	let channel = connection.open_channel(None)?;
	let _exchange = Exchange::direct(&channel);
	let queue = channel.queue_declare(queues::ENCRYPTION_QUEUE, QueueDeclareOptions::default())?;
	let consumer = queue.consume(ConsumerOptions::default())?;
	info!("The encryption service is now listening.");

	for (i, message) in consumer.receiver().iter().enumerate() {
		match message {
			ConsumerMessage::Delivery(delivery) => match delivery.routing_key.as_str() {
				functions::ENCRYPT => {
					info!("isAuth request detected.");
				}
				_ => {
					let body = String::from_utf8_lossy(&delivery.body);
					info!("({:>3}) Received [{}]", i, body);
					consumer.ack(delivery)?;
				}
			},
			other => {
				info!("Consumer ended: {:?}", other);
				break;
			}
		}
	}

	connection.close()
}
