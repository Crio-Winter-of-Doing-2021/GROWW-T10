import React, { useState, useEffect } from 'react';
const FaqEdit = (props) => {
  const [faq, setFaq] = useState({
    isLoginReq: false,
    isKycReq: false,
    question: '',
    answer: '',
  });

  useEffect(() => {
    if (props) {
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
      await fetch(`faq/${props.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faq),
      });
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
