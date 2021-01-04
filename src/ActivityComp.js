import React, { Component } from 'react'

class ActivityComp extends Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
            latitude:0,
            errmsg:''
        };
    } 

    activityFunc(lat){
        const currMonth=new Date().getMonth();
        const summer={
            text:'Outdoor Sports',
            iconName:'sun'
        }
        const winter={
            text:'Indoor Sports',
            iconName:'snowflake'
        }
        if(lat<0){
            if(currMonth>3 || currMonth<9){
                return summer;
            }else{
                return winter;
            }
        }else{
            if(currMonth>3 || currMonth<9){
                return winter;
            }else{
                return summer;
            }
        }
    }

    render() {
        window.navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            this.setState({
               latitude:position.coords.latitude 
            });
          },
          (err) =>
          {
              console.log(err);
              this.setState({
                errmsg:err.message
              });
          }
          );

          const{latitude,errmsg}=this.state;
          if(latitude !== 0 && !errmsg)
          {
              const activity=this.activityFunc(latitude);
              return(
                <h2 className="ui header">
                <i className={`${activity.iconName} outline icon`}></i>
                <div className="content">
                 Activity: {
                     `${activity.text}`
                  }
                </div>
              </h2>
              )
          }
          else if(latitude == 0 && errmsg)
          {
            return(
                <div>
                    Error : {errmsg}
                </div>
            )
          }
          
        return(
            <div>
                Loading...
            </div>
        )
    }
}

export default ActivityComp;