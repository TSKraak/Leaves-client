import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postNewComment } from "../../store/plants/actions";

interface Parameters {
  id: string;
}

export default function NewCommentForm() {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const params: Parameters = useParams();

  const { id } = params;

  function submitNewComment(event: React.MouseEvent) {
    event.preventDefault();

    dispatch(postNewComment(commentText, parseInt(id)));

    setCommentText("");
  }

  return (
    <div>
      <Form as={Col} md={{ span: 4 }} className="mt-5">
        <h5 className="mt-5">New comment:</h5>
        <Form.Group controlId="formBasicCommentText">
          <Form.Control
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            type="text"
            as="textarea"
            rows={4}
            placeholder="Type your comment here.."
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Button
            variant="success"
            type="submit"
            disabled={commentText ? false : true}
            onClick={submitNewComment}
          >
            Post comment
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
