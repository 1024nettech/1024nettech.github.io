// test-func.js
export const greet = () => {
    console.log("Hello from test-func.js!");
};

export let value = {a:42};


setTimeout(() => { alert(value["a"]) }, 10003);
