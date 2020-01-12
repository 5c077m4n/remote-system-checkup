pub enum Any {
	Null,
	Bool(bool),
	Number(Number),
	String(String),
	Array(Vec<Value>),
	Object(Map<String, Value>),
}
