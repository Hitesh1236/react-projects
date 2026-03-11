import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, ListGroup, Card } from "react-bootstrap";

export default function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("list")) || [];
  });

  const handleAdd = () => {
    if (task !== "") {
      setList([...list, { text: task, done: false }]);
      setTask("");
    }
  };

  const handleClear = () => {
    setList([]);
    setTask("");
  };

  const handleCheck = (index) => {
    setList(
      list.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const handleRemove = (RmIndex) => {
    setList(list.filter((_, index) => index !== RmIndex));
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card style={{ width: "450px" }} className="p-3 shadow">
        <Card.Title className="text-center mb-3">To Do List App</Card.Title>

        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />

          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>

          <Button variant="outline-danger" onClick={handleClear}>
            Clear
          </Button>
        </InputGroup>

        <ListGroup>
          {list.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
              style={{
                textDecoration: item.done ? "line-through" : "none",
              }}
            >
              <span className={item.done ? "text-muted" : ""}>{item.text}</span>

              <div>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleCheck(index)}
                >
                  ✓
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(index)}
                >
                  ✕
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}
