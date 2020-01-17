use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Debug)]
pub struct MessageCommand {
	pub cmd: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct AMQPMessage {
	pub id: String,
	pub pattern: MessageCommand,
	pub data: Value,
}
