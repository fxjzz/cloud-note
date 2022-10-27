import axios from 'axios'
import baseURLConfig from './config-baseURL'
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
axios.defaults.baseURL=baseURLConfig.baseURL
axios.defaults.withCredentials=true

export default function request(url,method='GET',data={}){
  return new Promise((resolve,reject)=>{
    let option={
      url,
      method,
      validateStatus(status){
        return (status>=200&&status<300 || status===400)
      }
    }
    if(method==='GET'){
      option.params=data
    }else{
      option.data=data
    }
    axios(option).then(res=>{
      if(res.status===200){
        resolve(res.data)
      }else{
        reject(res.data)
      }
    }).catch(()=>{
      reject({msg:'网络异常'})
    })
  })
}