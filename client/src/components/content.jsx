import React from 'react';
import AddCourse from './addCourse';
import AddStudent from './addStudent';
import AddStudentCourse from './addStudentCourse';
import CourseList from './courseList';

const Content = ({selectedItem}) =>{

    let component=null
    if(selectedItem==='add student'){
        component=<AddStudent/>
    }else if(selectedItem==='add course'){
        component=<AddCourse/>
    }else if(selectedItem==='add student at course'){
        component=<AddStudentCourse/>
    }else if(selectedItem==='course list'){
        component=<CourseList/>
    }
    return (
        <div>
            {component}
        </div>
      );
}



export default Content;