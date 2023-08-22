async function updateTodo(id, value) {
  await fetch('/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: value,
    }),
  })
}

const checkboxes = document.querySelectorAll('input[type=checkbox]')
const deleteButtons = document.querySelectorAll('button.delete')

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', async (e) => {
    const id = e.target.dataset.id
    const value = e.target.checked
    await updateTodo(id, value)
  })
})

deleteButtons.forEach((button) => {
  button.addEventListener('click', async (e) => {
    const id = e.target.dataset.id
    await fetch('/' + id, {
      method: 'DELETE',
    })
    window.location.reload()
  })
})
