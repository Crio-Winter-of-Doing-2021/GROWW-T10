import React, { useState, useEffect } from 'react';
import FaqView from './faqview';

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const getFaqs = async () => {
    try {
      const response = await fetch('/faq');
      const jsonData = await response.json();
      setFaqs(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <div>
      {faqs.map((faq) => (
        <FaqView
          item={{
            question: faq.question,
            answer: faq.answer,
            isLoginReq: faq.isLoginReq,
            isKycReq: faq.isKycReq,
          }}
          id={faq._id}
          key={faq._id}
        />
      ))}
    </div>
  );
};

export default FaqList;
