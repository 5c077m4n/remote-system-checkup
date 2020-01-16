use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Debug)]
pub struct CMD {
	pub cmd: String,
	pub pattern: Value,
}
