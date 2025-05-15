// test-func.js
export const greet = () => {
    console.log("Hello from test-func.js!");
};

export let value = 42;


setTimeout(() => { alert(value) }, 10000)
