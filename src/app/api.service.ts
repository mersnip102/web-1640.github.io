import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const api = "http://139.162.47.239/api/";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getCategoryById: any;

  constructor(private http: HttpClient) { }


  // Check user login yet
   isLoggedIn(): boolean {
    const user = localStorage.getItem('accessToken')
    return user !== null;
  }

  // Get user's info
  getUserRole(): string {
   
    const helper = new JwtHelperService();
    if(localStorage.getItem('accessToken') == null){
      return '';
    }
    const user = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    console.log(user.role);
    return user ? user.role : '';
  }

  getDashboard(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.get(api + `qam/dashboard`, {headers:httpOptions.headers, responseType: 'json'})
  }


  dowloadFileZip() {
    
    const httpOptions = {
      headers: new HttpHeaders({
       
        'Content-Type': 'application/zip',
        'Accept': 'application/zip',
        'Access-Control-Allow-Origin': '*',
      })
    };
      return this.http.get(api + 'qam/download-files'
      , {headers:httpOptions.headers, responseType: 'blob'})

  }


  editIdea(id: any, data: any): Observable<any> {
    const httpOptions = {
      
        headers: new HttpHeaders({
          'Authorization': 'Bearar ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        })
        
      }
      
    
    return this.http.put(api + `idea/update/${id}`, data, {headers:httpOptions.headers, responseType: 'json'})
  }

  getIdeaByEvent(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.get(api + `event/list-idea/${id}`, {headers:httpOptions.headers, responseType: 'json'})
  }

  getIdeaByCategory(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.get(api + `category/list-idea/${id}`, {headers:httpOptions.headers, responseType: 'json'})
  }



  likeDislike(id: any, like: boolean, dislike: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post(api + `idea/like/${id}`, {like: like, dislike: dislike}, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }



 


  createComment(formData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post(api + 'comment/create', formData, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }




  downloadFile(fileName: any): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   })
    // };

    const httpOptions = {
      headers: new HttpHeaders({
       
        'Content-Type': 'application/json',
        
        'Access-Control-Allow-Origin': '*',
      })
    };

      

   
    
      return this.http.get(`http://139.162.47.239/download/${fileName}`
      , {headers:httpOptions.headers, responseType: 'blob'})
  }


  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }


  downloadCSV(id: any): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   })
    // };

    const httpOptions = {
      headers: new HttpHeaders({
       
        'Content-Type': 'application/csv',
        'Accept': 'application/csv',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api +  `qam/download-csv/${id}`
      , {headers:httpOptions.headers, responseType: 'blob'})
  }



  getDocumentById(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api +  `qam/detail-document/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})
   
  }



  getListDocument(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api +  'qam/get-event-document'
      , {headers:httpOptions.headers, responseType: 'json'})
   
  }
  login(email:string='', password:string=''): Observable<any>{
    var userInfo = { email:email, password:password }
    var dataJson = JSON.stringify(userInfo);
    console.log(userInfo);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post(api + 'user/login'
    , dataJson// data minh se gui len
    , {headers: headers} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  )
  }//l
  // getAll():Observable<Account[]>{
  //   return this.http.get<Account[]>(api).pipe(
  //   )
  // }

  deleteCategory(id: number){
    console.log(id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.delete(api + `category/delete/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }
  deleteDepartment(id: number){
    console.log(id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.delete(api + `department/delete/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }
  // listCategory():Observable<Category>{
  //   return this.http.get<Category>(this.)
  // }

  getCategory() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + 'category/list'
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }
  getDepartment ()
  {

    const httpOptions = {
      headers: new HttpHeaders( {
        'Authorization': 'Bearer ' + localStorage.getItem( 'accessToken' ),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      } )
    };

    return this.http.get( api + 'department/list'
      , { headers: httpOptions.headers, responseType: 'json' } )//stringify de chuyen doi tu object sang json


  }
  getListCategory ()
  {

    const httpOptions = {
      headers: new HttpHeaders( {
        'Authorization': 'Bearer ' + localStorage.getItem( 'accessToken' ),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      } )
    };

    return this.http.get( api + 'category/list'
      , { headers: httpOptions.headers, responseType: 'json' } )//stringify de chuyen doi tu object sang json


  }
  getListDepartment ()
  {

    const httpOptions = {
      headers: new HttpHeaders( {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken' ),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      } )
    };

    return this.http.get( api + 'department/list'
      , { headers: httpOptions.headers, responseType: 'json' } )//stringify de chuyen doi tu object sang json


  }
  addDepartment(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    const department = {name: name}

    return this.http.post(api + 'department/add', department, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }

  editDepartment(id: number, name: string){

    const data = {name:name}

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });

    return this.http.put(api + `department/update/${id}`, data, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }


  addCategory(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    const category = {name: name}

    return this.http.post(api + 'category/add', category, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }

  editEvent(formData: FormData){

    console.log(formData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });

    return this.http.put(api + 'event/update', formData, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json


  }


  deleteEvent(id: any){
    console.log(id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.delete(api + `event/delete/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }





  getComment(ideaId: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
     


    };

    // if(page == undefined || limit == undefined){
    //   return this.http.get(api + 'comment/list'
    //   , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
    // }
    // else {
  
      return this.http.get(api +  `comment/list/?ideaId=${ideaId}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

    


  }

  

  editComment(id: any, data: any){


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });

    return this.http.put(api + `comment/update/${id}`, {content: data}, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }


  deleteComment(id: any){
    console.log(id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.delete(api + `comment/delete/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }










  // addReplyComment(formData: FormData) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     })
  //   };


  //   return this.http.post(api + 'comment/create', formData, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  // }




  // editReplyComment(id: number, formData: FormData){


  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',

  //     'Access-Control-Allow-Origin': '*',
  //     'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  //   });

  //   return this.http.put(api + `comment/update/${id}`, formData, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  // }


  deleteReplyComment(id: any){
    console.log(id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.delete(api + `comment/delete/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }
























  getEvents() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + 'event/list'
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }

  addEvent(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };


    return this.http.post(api + 'event/add', data, {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json

  }



  deleteIdeas(id: number){

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + `ideas/delete/${id}}`
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json


  }

  getIdeas(page?: number, limit?: number, params?: any) {

    // let params= {
    //   eventId: this.eventSelected,
    //   categoryId: this.categorySelected,
    //   departmentId: this.departmentSelected,
    //   sort: this.ngFilterSelected

    // }

    if(params.eventId == undefined || params.eventId == null || params.eventId == 0){
      delete params.eventId;
    }
    if(params.categoryId == undefined || params.categoryId == null || params.categoryId == 0){
      delete params.categoryId;
    }
    if(params.departmentId == undefined || params.departmentId == null || params.departmentId == 0){
      delete params.departmentId;
    }
    if(params.sort == undefined || params.sort == null || params.sort == "0"){
      delete params.sort;
    }
    

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Barer ' + localStorage.getItem('accessToken'),
        
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params: params
    };

    // return this.http.get(api + 'idea/list'
    // , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json

   
    if(page == undefined || limit == undefined){
      return this.http.get(api + 'idea/list'
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
    }
    else {
      console.log(page);
      return this.http.get(api + `idea/list?page=${page}&limit=${limit}`
      , {headers:httpOptions.headers, params: httpOptions.params, responseType: 'text'})//stringify de chuyen doi tu object sang json

    }

  }

  addIdea(formData: FormData) {
    console.log(formData.get('files'))
    console.log(formData.get('title'))
    console.log(formData.get('content'))
    console.log(formData.get('categoryId'))
    console.log(formData.get('eventId'))
    console.log(formData.get('anonymous'))
    

    const httpOptions = {
      headers: new HttpHeaders({
        
        'Authorization': 'Baee ' + localStorage.getItem('accessToken'),
       
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post(api + 'idea/create', formData, {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json

  }


  deleteIdea(id: any) {
    
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baee ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.delete(api + `idea/delete/${id}`, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }

  updateIdea(formData: FormData) {
    console.log(formData.get('files'))
    console.log(formData.get('title'))
    console.log(formData.get('content'))
    console.log(formData.get('categoryId'))
    console.log(formData.get('eventId'))
    console.log(formData.get('anonymous'))
    

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baee ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.put(api + 'idea/create', formData, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }


  getIdeaById(id: any) {
    
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baee ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.get(api + `idea/${id}`, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }


  getListIdeaByCategory(id: any, page?: number, limit?: number) {
    
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baee ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    if(page == undefined || limit == undefined){
      return this.http.get(api + `category/list-idea/${id}`, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
    }
    else {
      console.log(page);
      return this.http.get(api + `category/list-idea/${id}?page=${page}&limit=${limit}`
      , {headers:httpOptions.headers, responseType: 'json',})

    }

  }


  getEventById(id: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
       
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + `event/show/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }





  
  getListComment(ideaId:any, page?: number, limit?: number) {
    console.log(localStorage.getItem('refreshToken'));

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Barer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
   
    if(page == undefined || limit == undefined){
      return this.http.get(api + `comment/list?ideaId=${ideaId}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
    }
    else {
      console.log(page);
      return this.http.get(api + `comment/list?ideaId=${ideaId}?page=${page}&limit=${limit}`
      , {headers:httpOptions.headers, responseType: 'json',})//stringify de chuyen doi tu object sang json

    }

  }

  addComment(formData: FormData) {
    console.log(formData.get('files'))
   
    console.log(formData.get('content'))
   
    console.log(formData.get('ideaId'))
   
    

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
       
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post(api + 'comment/create', formData, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }

  updateComment(id:any,formData: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baee ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.put(api + `comment/update/${id}`, formData, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }






  likeIdea(id:any) {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Barer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
   
    
      return this.http.get(api + `idea/like/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
    

  }


  dislikeIdea(id:any) {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Barer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
   
    
      return this.http.get(api + `idea/dislike/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
    

  }

  likeComment(id:any) {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Barer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
   
    
      return this.http.get(api + `comment/like/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
    

  }


  getUserById(id:any) {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Barer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
   
    
      return this.http.get(api + `user/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json
    

  }
















  getAnAcount(email:string=''){
    const userInfo = { email:email}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'getAnAcount', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
  testtestNewAccount(email: string='', testtestNewAccount: Object){
    const userInfo = { email: email, newaccount: testtestNewAccount}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'testtestNewAccount', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
  createNewAccount(formData: FormData){





    const headers = new HttpHeaders({

      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });


    console.log(localStorage.getItem('accessToken'));

    return this.http.post(api + 'user/register', formData, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }

  editUser(id: string, formData: FormData){

    let form = {

      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      department: formData.get('department'),
      role: formData.get('role'),

    }
    console.log(form);





    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });

    return this.http.put(api + `user/update/${id}`, form, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }

  changePassword(formData: any){
   
    const helper = new JwtHelperService();
    const user = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.put(api + `user/change-password-user/${user.id}`
    , formData// data minh se gui len
    , {headers:headers, responseType: 'text'} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  )
  }//resetPassword
  getUsers(page?: number, limit?: number): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        // 'Accept': 'application/json'

      })
    };

    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Baeare ' + localStorage.getItem('accessToken'));

    console.log(localStorage.getItem('accessToken'));
    // console.log(JSON.stringify(formData));
    // const dataUser = JSON.stringify(formData)
    if(page == undefined || limit == undefined){
      return this.http.get(api + 'user/list-user'
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
    }
    else {
      console.log(page);
      return this.http.get(api + `user/list-user?page=${page}&limit=${limit}`
      , {headers:httpOptions.headers, responseType: 'text',})//stringify de chuyen doi tu object sang json

    }
  }



  deleteUser(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Accept': 'application/json'
      }),
      body: {}
    };

    return this.http.post(api + `user/delete/${id}`, {}, httpOptions);
  }

}
