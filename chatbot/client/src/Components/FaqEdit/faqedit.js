import React, { useState, useEffect } from 'react';
const FaqEdit = (props) => {
  const [faq, setFaq] = useState({
    isLoginReq: false,
    isKycReq: false,
    question: '',
    answer: '',
    upvotes: 0,
    downvotes: 0,
    tags: ['DEFAULT'],
  });

  useEffect(() => {
    if (props.item) {
      setFaq(props.item);
    }
  }, [props]);

  const change = (e) => {
    if (e.target.type === 'checkbox') {
      setFaq({ ...faq, [e.target.name]: e.target.checked });
    } else setFaq({ ...faq, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
      let response;
      if (props.item) {
        response = await fetch(`/faq/${props.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(faq),
        });
      } else {
        response = await fetch(`/faq`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(faq),
        });
      }
      response = await response.json();
      navigator.clipboard.writeText(
        `FAQ---http://localhost:8080/faq/${response._id}`,
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="faqEditModal">
      <h1>Edit FAQ</h1>
      <form>
        <label>Question</label>
        <textarea
          name="question"
          autoComplete="off"
          value={faq.question}
          onChange={(e) => change(e)}
        />
        <label>Answer</label>
        <textarea
          name="answer"
          autoComplete="off"
          value={faq.answer}
          onChange={(e) => change(e)}
        />
        <label>
          Is Login Required?
          <input
            name="isLoginReq"
            type="checkbox"
            checked={faq.isLoginReq}
            onChange={(e) => change(e)}
          />
        </label>
        <label>
          Is KYC Required?
          <input
            name="isKycReq"
            type="checkbox"
            checked={faq.isKycReq}
            onChange={(e) => change(e)}
          />
        </label>
        <button type="submit" name="submit" onClick={(e) => submit(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FaqEdit;
