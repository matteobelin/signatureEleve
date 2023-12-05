import React from 'react';
import AddCourse from './addCourse';
import AddStudent from './addStudent';
import AddStudentCourse from './addStudentCourse';
import CourseList from './courseList';

const Content = ({selectedItem}) =>{

    let component=null
    if(selectedItem==='Add student'){
        component=<AddStudent/>
    }else if(selectedItem==='Add course'){
        component=<AddCourse/>
    }else if(selectedItem==='Add student at course'){
        component=<AddStudentCourse/>
    }else if(selectedItem==='Course list'){
        component=<CourseList/>
    }
    return (
        <div>
            {component}
        </div>
      );
}



export default Content;