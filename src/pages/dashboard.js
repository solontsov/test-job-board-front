import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Dashboard() {
   const [state, setState] = useState("")
   const [Applicant, setApplicants] = useState([]);
   const [jobTitle, setjobTitle] = useState("")
   const [jobCategory, setjobCategory] = useState("")
   const [jobLocation, setjobLocation] = useState("")
   const [jobDescription, setjobDescription] = useState("")
   const [jobExpreience, setjobExpreience] = useState("")
   const [openJob, setOpenJob] = useState([])
   const queryParams = new URLSearchParams(window.location.search);
   const token = queryParams.get('token');

   function Applicants() {
       fetch("http://localhost:1337/api/applicantlists", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer bc55770e85deaa8c54d32ff42d8df040a99d1327f43217fcabcce6f47845818cf366ddf18be562be4827a0dd2f02c47736231c734c6086a68d288eda44790aec8d303b2e67740ba070199c137b9b5d09087ce674de7a64f106b921fe62ffe6086fcf2156dd11f9e1879883933cf5412866134e7b14dac33a9fc8c6544aa4f5df",
          "Content-Type": "application/json",
        },
      })
           .then(res => res.json())
           .then(list => {
               setApplicants(list.data);
           })

   }

   function open() {
       fetch("http://localhost:1337/api/joblists", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer bc55770e85deaa8c54d32ff42d8df040a99d1327f43217fcabcce6f47845818cf366ddf18be562be4827a0dd2f02c47736231c734c6086a68d288eda44790aec8d303b2e67740ba070199c137b9b5d09087ce674de7a64f106b921fe62ffe6086fcf2156dd11f9e1879883933cf5412866134e7b14dac33a9fc8c6544aa4f5df",
          "Content-Type": "application/json",
        },
      })
           .then(res => res.json())
           .then(list => {
               setOpenJob(list.data);
           })

   }

   const update = async (id) => {
       const requestOptions = {
           method: 'PUT',
           headers: {Authorization:
            "Bearer bc55770e85deaa8c54d32ff42d8df040a99d1327f43217fcabcce6f47845818cf366ddf18be562be4827a0dd2f02c47736231c734c6086a68d288eda44790aec8d303b2e67740ba070199c137b9b5d09087ce674de7a64f106b921fe62ffe6086fcf2156dd11f9e1879883933cf5412866134e7b14dac33a9fc8c6544aa4f5df",
             'Content-Type': 'application/json'  },
           body: '{"data":{"Status":"Approved"}}'
       };
       console.log(requestOptions)
       fetch('http://localhost:1337/api/applicantlists/' + id, requestOptions)
           .then(response => response.json())
           .then(data => this.setState("1"));


   }
   const delete1 = async (id) => {
       const requestOptions = {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json' }
       };
       console.log(requestOptions)
       fetch('http://localhost:1337/api/applicantlists/' + id, requestOptions)
           .then(response => response.json())
           .then(data => this.setState("1"));


   }

   useEffect(() => {
       Applicants();
       open();
   }, [])

   if (typeof (Applicant.id) === "undefinsed") {
       const url = "/login";
       return <Navigate to={url} />;
   }


   const addjob = async () => {
       const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
               "data": {
                   "JobPosition": jobTitle,
                   "Category": jobCategory,
                   "Location": jobLocation,
                   "Experience": jobExpreience,
                   "JobDescription":jobDescription,
                   "JobStatus": "Open",
                   "Agency": "Strapi"
               }
           })
       };
       // console.log(requestOptions)
       fetch('http://localhost:1337/api/joblists', requestOptions)
           .then(response => response.json())
       //  .then(data => this.setState(data ));

       alert("Job Added Successful...");
   }

   return (
       <div>
           <div className="header">
               <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
               <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
               <div >

                   <div className="menu1">
                       <Link to="/">Job Board</Link>


                   </div>

                   <div className="menu2">
                       <Link to="/">Logout</Link>
                   </div>

               </div>
           </div>
           <br /><br />

           <div className="filter_">
               <br />

               <div className="filter2_">
                   <span>Open Positions</span>
                   <hr />
                   {
                       openJob.map((list, i) => {

                           if (list.attributes.JobStatus === "Open") {
                               return (
                                   <div key={i}>
                                       <span style={{ fontSize: '17px' }}>{list.attributes.JobPosition}</span>
                                       <hr />
                                   </div>
                               )
                           }
                       })
                   }


               </div>

           </div>
           <div className="job2">
               <br /><br />

               {
                   Applicant.map((list, i) => {

                       if (list.attributes.Status == "Pending") {
                           return (
                               <div key={i}>
                                   <div>
                                       <div className="detaills_">
                                           <div className="logo_"></div>
                                           <div className="description">
                                               <span className="span1_">{list.attributes.Name}</span>
                                               <span style={{ float: 'right' }}>{list.attributes.Status}</span>
                                               <br />
                                               <span className="span1_">{list.attributes.Email}</span>
                                               <textarea style={{ borderWidth: '0px' }} readonly id="" cols="70"
                                                   rows="3">{list.attributes.Message}</textarea>
                                               <center>
                                                   <a target={"_blank"} href={list.attributes.Portfolio_Link}>View Portfolio</a> <br />
                                                   <button className="btn-success" onClick={() => update(list.id)} >Approve</button>
                                                   <button className="btn-danger" onClick={() => delete1(list.id)}>Decline</button>
                                               </center>
                                           </div>

                                       </div>

                                   </div> <br />
                               </div>
                           )

                       }
                   })
               }
        </div>

           <div className="filt">
               <br />

               <div className="filter2_">
                   <span>Post New Position</span><br /><br />
                   <form className="filter3_" method="get">
                       <input type="text" onChange={(event) => setjobTitle(event.target.value)} placeholder="Job Title" style={{ width: '200px', borderRadius: '10px' }} />
                       <input type="text" onChange={(event) => setjobCategory(event.target.value)} placeholder="Enter Job Category" style={{ width: '200px', borderRadius: '10px' }} />
                       <br />
                       <input type="text" onChange={(event) => setjobLocation(event.target.value)} placeholder="Location" style={{ width: '200px', borderRadius: '10px' }} id="" />
                       <br />

                       <textarea onChange={(event) => setjobDescription(event.target.value)} style={{ width: '200px', borderRadius: '10px' }}
                           placeholder="Job description"></textarea>
                       <br />

                       <select onChange={(event) => setjobExpreience(event.target.value)} className="select">
                           <option disabled selected>Requirement</option>
                           <option value="Experience : 0 - 1 year">Experience : 1 - 3 years</option>
                           <option value="Experience : 2 - 3 years">Experience : 1 - 3 years</option>
                           <option value="Experience : 4 - 7 years">Experience : 4 - 7 years</option>
                       </select><br /><br />


                       <center>
                           <input type="button" onClick={() => addjob()} className="form-control" value="Add Job" />
                       </center>

                   </form>
               </div>

           </div>


       </div>

   );
}