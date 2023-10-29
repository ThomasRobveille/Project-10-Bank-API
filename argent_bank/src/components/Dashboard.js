import { useState } from "react"
import "../stylesheet/Dashboard.css"
import { useSelector, useDispatch } from "react-redux"
import { updateUserProfile } from "../services/SignIn"
import { setUser } from "../store/LoginSlice"
import { useNavigate } from "react-router-dom"


export default function Dashboard() {

  const userName = useSelector(state => state.userName)
  const token = useSelector(state => state.token)
  const [showEdit, setShowEdit] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function updateUser(){
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    if(firstName === "") firstName = userName.firstName
    if(lastName === "") lastName = userName.lastName
    let data = {
      firstName: firstName,
      lastName: lastName,
    }
    try{
      const updateUser = await updateUserProfile(token, data)
      dispatch(setUser(data))
      sessionStorage.setItem('user', JSON.stringify(data))
      setShowEdit(false)
    } catch(error) {
      console.log(error)
    }
  }

  function showEditTrigger(e){
    setShowEdit(true)
  }
  
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userName.firstName} {userName.lastName}</h1>
        {
          showEdit == false ? (
            <button className="edit-button" onClick={() => showEditTrigger()}>Edit Name</button>
          ) : (
          <div className="editFormContainer">
            <div className="editAction editForm">
              <input id="firstName" type="text" name="firstName" placeholder={userName.firstName}/>
              <input id="lastName" type="text" name="lastName" placeholder={userName.lastName}/>
            </div>
            <div className="editAction editButton">
              <button onClick={() => updateUser()}>Save</button>
              <button className="edit-button" onClick={() => setShowEdit(false)}>Cancel</button>
            </div> 
          </div>
          )
        }        
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}