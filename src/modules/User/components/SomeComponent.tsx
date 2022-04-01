import React from 'react';

interface Props {
  message: String
}

const SomeComponent = (props: Props) => {
  console.log("object", props)
    return <h2>message: {props.message}</h2>;
};

export default SomeComponent;
