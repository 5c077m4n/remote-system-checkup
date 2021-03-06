extern crate bcrypt;
#[macro_use]
extern crate log;
extern crate env_logger;
extern crate serde_json;

mod consts;
mod types;

use amiquip::{
	Connection, ConsumerMessage, ConsumerOptions, Exchange, Publish, QueueDeclareOptions, Result,
};
use consts::{functions, queues};
use env_logger::Env;
use futures::executor::block_on;

fn init_logger() {
	let env = Env::default()
		.filter_or("MY_LOG_LEVEL", "info")
		.write_style_or("MY_LOG_STYLE", "always");
	env_logger::init_from_env(env);
}

async fn hash(text: &str) -> String {
	let content: &[u8] = text.as_bytes();
	bcrypt::hash(content, bcrypt::DEFAULT_COST + 2)
		.expect("There was an error in hashing the string.")
}

async fn verify(_text: &str) -> bool {
	true
}

async fn run() -> Result<()> {
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
				info!("Message: {}", body);
				let rmq_request: types::AMQPMessage = serde_json::from_str(&body)
					.expect("Error in parsing the received AMPQ message");
				info!(
					"[{}] ({:>3}) Received [{:?}]",
					delivery.routing_key, i, rmq_request
				);

				match rmq_request.pattern.cmd.as_str() {
					functions::JWT => {
						exchange
							.publish(Publish::new(b"functions::JWT", queues::ENCRYPTION_QUEUE))?;
					}
					functions::BCRYPT_HASH => {
						if let Some(pass) = rmq_request.data.as_str() {
							let hash: String = hash(&pass).await;
							exchange
								.publish(Publish::new(hash.as_bytes(), queues::ENCRYPTION_QUEUE))?;
						} else {
							error!("Bad data received.")
						}
					}
					functions::BCRYPT_VERIFY => {
						if let Some(pass) = rmq_request.data.as_str() {
							let is_valid: bool = verify(&pass).await;
							exchange.publish(Publish::new(
								if is_valid { b"true" } else { b"false" },
								queues::ENCRYPTION_QUEUE,
							))?;
						} else {
							error!("Bad data received.");
						}
					}
					unknown_fn => {
						warn!("Unknow function called: {}", unknown_fn);
					}
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

fn main() -> Result<()> {
	block_on(run())
}
