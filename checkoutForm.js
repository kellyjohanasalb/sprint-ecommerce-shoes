const form = document.querySelector('.modal-checkout__form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.querySelector('#input-name').value;
  const identification = document.querySelector('#input-id').value;
  const creditCard = document.querySelector('#input-creditcard').value;

  const response = await fetch("http://localhost:3000/users",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, 
        identification,
        creditCard
      })
    });
  const data = await response.json();   
  // console.log(data);
})
