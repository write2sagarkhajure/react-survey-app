import React, { useState} from 'react';
import axios from 'axios';
import { removeUserSession, getToken} from './Utils/Common';

function Survey(props) {

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [caseClosure, setCaseClosure] = useState(false);
  const [activityClosure, setActivityClosure] = useState(false);
  const [surveyAccessibility, setSurveyAccessibility] = useState('');

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(active);
    console.log(name);
    console.log(url);
    console.log(email);
    console.log(expiryDate);
    console.log(caseClosure);
    console.log(activityClosure);
    console.log(surveyAccessibility);
    if (!(caseClosure || activityClosure)) {
      alert('Please select atleast one survey trigger');
    }
    if(!surveyAccessibility) {
      alert('Please select survey accessibility group');
    }

    let objToPost = {
        "surveyActive": active,
        "surveyName": name,
        "surveyUrl": url,
        "surveyExpiry": expiryDate,
        "surveyFrom": email,
        "surveyAccessibility": surveyAccessibility
    }

    objToPost.surveyTrigger = [];
    if (caseClosure) {
      objToPost.surveyTrigger.push("case");
    }
    if (activityClosure) {
      objToPost.surveyTrigger.push("activity");
    }

    console.log(objToPost);
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    axios.post('https://2nt4ex8dwg.execute-api.us-east-1.amazonaws.com/dev/surveys', objToPost, {
      headers: headers
    })
    .then(response => {
      console.log(response);
      setSuccess("Survey created successfully");
    }).catch(error => {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <>
      {success && <><small style={{ color: 'green' }}>{success}</small><br /></>}<br />
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <form onSubmit={submitForm}>
        <div className="form-control">
          <input type="radio" name="active" onChange={(e) => setActive(e.target.value)} checked={active}/>
          <label htmlFor="surveyActive">Active</label>
        </div>
        <div className="form-control">
          <label htmlFor="surveyName">Survey Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter survey name..." required/>
        </div>
        <div className="form-control">
          <label htmlFor="surveyUrl">Survey URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter survey url..." required/>
        </div>
        <div className="form-control">
          <label htmlFor="surveyExpiryDate">Survey Expiry Date</label>
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="Enter survey expiry date..." required/>
        </div>
        <div className="form-control">
          <label htmlFor="surveyFromEmail">Survey From Email Address</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter survey from emailAddress..." required/>
        </div>
        <div className="form-control">
          <h4>Survey Trigger:</h4>
          <input type="checkbox" name="surveyTrigger" onChange={(e) => setCaseClosure(e.target.value)} checked={caseClosure}/>
          <label htmlFor="caseClosure">Case Closure</label>
          <input type="checkbox" name="surveyTrigger" onChange={(e) => setActivityClosure(e.target.value)} checked={activityClosure}/>
          <label htmlFor="activityClosure">Activity Closure</label>
        </div>
        <div className="form-control">
          <select defaultValue={'DEFAULT'} name="surveyAccessibility" onChange={e => setSurveyAccessibility(e.target.value)} required>
              <option value="DEFAULT" disabled>Choose an option</option>
              <option id="0">Usergroup1</option>
              <option id="1">Usergroup2</option>
          </select>
        </div>
        <input type="submit"/>
      </form>
      
      <input type="button" onClick={handleLogout} value="Logout" />
    </>
  );
}

export default Survey;
