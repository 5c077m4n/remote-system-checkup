#[macro_use]
extern crate log;
extern crate env_logger;
extern crate serde_json;

mod consts;

use amiquip::{
	Connection, ConsumerMessage, ConsumerOptions, Exchange, Publish, QueueDeclareOptions, Result,
};
use consts::{functions, queues};
use env_logger::Env;
use serde_json::{Value, to_string};

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
	let queue = channel.queue_declare(queues::ENCRYPTION_QUEUE, QueueDeclareOptions::default())?;
	let consumer = queue.consume(ConsumerOptions::default())?;
	info!("The encryption service is now listening.");

	for (i, message) in consumer.receiver().iter().enumerate() {
		match message {
			ConsumerMessage::Delivery(delivery) => {
				let body = String::from_utf8_lossy(&delivery.body);
				let json: Value =
					serde_json::from_str(&body).expect("Error parsing incoming json.");
				info!(
					"[{}] ({:>3}) Received [{:?}]",
					delivery.routing_key, i, json["pattern"]["cmd"]
				);
				let fn_name = to_string(&json["pattern"]["cmd"])
					.expect("Error in parsing the received json.");

				match fn_name.as_str() {
					functions::ENCRYPT => {
						info!("{} request detected.", functions::ENCRYPT);
						exchange.publish(Publish::new(
							b"functions::ENCRYPT",
							queues::ENCRYPTION_QUEUE,
						))?;
					}
					functions::JWT => {
						info!("{} request detected.", functions::JWT);
						exchange
							.publish(Publish::new(b"functions::JWT", queues::ENCRYPTION_QUEUE))?;
					}
					_ => ()
				}

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
