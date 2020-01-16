use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AMQPMessage {
	pub cmd: String,
	pub pattern: String,
}
