#![allow(unused_variables)]
#[macro_use]
extern crate log;

use amiquip::{
	Connection, ConsumerMessage, ConsumerOptions, Exchange, QueueDeclareOptions, Result,
};
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
	let exchange = Exchange::direct(&channel);
	let queue = channel.queue_declare("AUTH_QUEUE", QueueDeclareOptions::default())?;
	let consumer = queue.consume(ConsumerOptions::default())?;
	info!("The auth service is now listening.");

	for (i, message) in consumer.receiver().iter().enumerate() {
		match message {
			ConsumerMessage::Delivery(delivery) => {
				let body = String::from_utf8_lossy(&delivery.body);
				info!("({:>3}) Received [{}]", i, body);
				consumer.ack(delivery)?;
			}
			other => {
				info!("Consumer ended: {:?}", other);
				break;
			}
		}
	}

	connection.close()
}
