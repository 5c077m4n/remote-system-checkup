pub enum Any {
    Null,
    Bool(bool),
    Number(Number),
    String(String),
    Array(Vec<Any>),
    Object(Map<String, Any>),
}
