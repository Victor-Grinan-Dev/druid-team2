import React, { useEffect } from "react";
import events from "events";
//import ProjectBox from "./ProjectBox";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import ProjectCard from "./projectCard/ProjectCard";
//import { Projects } from "../../ajax/Projects";
import { ajaxGet } from "../../ajax/services";
import { setProjects } from "../../features/druidSlice";

const emitter = new events.EventEmitter();

const CustomersProjects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.druid.projects);
  const userId = useSelector(state => state.druid.user.current_user.uid)
  //const projects = useSelector((state) => state.druid.projects);
  //const isLoading = useSelector((state) => state.druid.isLoading);
  const admin = useSelector((state) => state.druid.user.current_user?.roles);
  //const search = useSelector((state) => state.druid.search);
  //const searchBy = useSelector((state) => state.druid.searchBy);

  //const [projects, setProjects] = useState()

  useEffect(() => {
    getProjects();
  }, []);

   const getProjects = async () => {
    ajaxGet("/node/osproject2").then(res => {
      console.log(userId)
      dispatch(setProjects(res))
    });
/*
    try {
      const axios = await ajax();
      const response = await axios.get("/node/osproject2");
      console.log("projects:", response.data)
      if (response.data) {
        setProjects(response.data);
      }
    } catch (e) {
      alert(e);
    }
*/
  }
/*
  const filteredProjectsHandler = () => {
    switch (searchBy) {
      case "customer":
        return projects.filter((proj) => {
          return proj.customer.toLowerCase().includes(search.toLowerCase());
        });

      case "developer":
        return projects.filter((proj) => {
          if (search) {
            for (let dev of proj.developers) {
              if (dev.includes(search.toLowerCase())) return proj;
            }
          } else {
            return proj;
          }
        });

      case "project" || "":
        return projects.filter((proj) => {
          return proj.name.toLowerCase().includes(search.toLowerCase());
        });

      case "engine":
        let projArr = [];
        for (let proj of projects) {
          for (let serv of proj.services) {
            if (
              serv.engine.toLowerCase().includes(search.toLowerCase()) &&
              !projArr.includes(proj)
            ) {
              projArr.push(proj);
            }
          }
        }

        return projArr;
      default:
        return projects;
    }
  };
*/

/*
  const access = () => {
    if (user.userType === "customer") {
      return projects.map(
        (project, i) =>
          project.customer === user.company && (
            <ProjectCard project={project} index={i + 1} key={i} />
          )
      );
    } else if (user.userType === "developer") {
      return projects.map(
        (project, i) =>
          project.developers.includes(user.username.toLowerCase()) && (
            <ProjectCard project={project} index={i + 1} key={i} />
          )
      );
    }
        return filteredProjectsHandler().map((project, i) => (
      <ProjectCard project={project} index={i + 1} key={i} full={false} />
    ));
  };
*/



  /*
  if (isLoading) {
    return <p>... Loading data ...</p>;
  }
*/

  // testing

  return (
    <div className="customersProjects">
      <div className="searchProjects">
        <Search />
      </div>
      <h2 className="projectsH2">Projects</h2>
      <div className="cardsArea">
        {
          projects && !admin ?
          projects
          .filter(p=>{console.log(p?.field_customer_conctact[0]?.target_id, userId)
            return (
              p?.field_customer_conctact[0]?.target_id === parseInt(userId, 10) || 
              p?.field_developers[0]?.target_id === parseInt(userId, 10)
              );
          })
          .map((project, index) => {
            //console.log(project?.field_customer_conctact[0]?.target_id)
            return (
              <ProjectCard
                key={index}
                nid={project.nid[0].value}
                project={project}
              />
            );
          }) :
          projects
            .map((project, index) => {
              //console.log(project?.field_customer_conctact[0]?.target_id)
              return (
                <ProjectCard
                  key={index}
                  nid={project.nid[0].value}
                  project={project}
                />
              );
            })
        }
        {/* {
          projects &&
          projects.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                nid={project.nid[0].value}
                project={project}
              />
            );
          })} */}
      </div>
    </div>
  );
};

export default CustomersProjects;
