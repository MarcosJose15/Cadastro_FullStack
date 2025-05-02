//Hooks
import { useEffect, useState,useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'


function Home() {
const [users, setUsers]  = useState([])

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get("/users")

    setUsers(usersFromApi.data)
  }

  async function createUsers(){
    await api.post("/users", {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value
    })
    getUsers()
  }

  async function deleteteUsers(id){
    await api.delete(`/users/${id}`)
    getUsers()
  }
  
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
          <div class="px-6 h-20 py-4 max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-3">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 w-20" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Showcase</span>
            </a>
            
            <div class="hidden  w-full md:block md:w-auto" id="navbar-default">
              <ul class="pr-8 gap-6 font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                </li>
                <li>
                  <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
                </li>
                <li>
                  <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                </li>
                <li>
                  <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <form>
            <h1>Cadastro de usuário</h1>
            <input placeholder="Nome" name="name" type="text" ref={inputName}/>
            <input placeholder="Idade" name="age" type="number" ref={inputAge}/>
            <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
            <button onClick={createUsers} type="button">Cadastrar</button>
          </form>

          {users.map((user) => (

            <div key={user.id} className="card">
              <div>
                <p>Nome: <span> {user.name} </span> </p>
                <p>Email: <span>  {user.email} </span> </p>
                <p>Idade: <span> {user.age} </span> </p>
              </div>
              
              {/* Função enviando Paramentro */}
              <button onClick={() => deleteteUsers(user.id)}>
                <img src={Trash} />
              </button>
            </div>

          ))}

        </div>
      </div >
    </>
  )
}

export default Home;
