import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap'
import '../style/users.scss'
import axios from 'axios'
import MenuAdmin from '../components/menuAdmin.js'

const Editors = () => {

  const [editors, setEditors] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {

    axios.post('http://localhost:3100/admin/editor-all', {
      email: JSON.parse(localStorage.getItem('authAdmin')).admin.email,
    },
      {
        headers: {
          authorization: localStorage.getItem('tokenAdmin')
        }
      }
    ).then((result) => {
      console.log(result)
      result.data.isAdmin ? setIsAdmin(true) : setIsAdmin(false)
      const editorList = []
      if (isAdmin) {
        setIsOwner(true)
        result.data.editors.map((item) => {
          editorList.push(item)
          return editorList;
        })
        setEditors(editorList);
      }




    })

  }, [isAdmin])

  const asyncHandleSubmit = async (editor) => {
    let alertMessage = '';
    console.log(editor)
    await axios.post('http://localhost:3100/admin/editor-delete', {
      editorId: editor,
    },
      {
        headers: {
          authorization: localStorage.getItem('tokenAdmin')
        }
      }
    ).then((result) => {

      console.log(result.data)
      if (result.data.succeded) {
        alertMessage = result.data.message
      }
      axios.post('http://localhost:3100/admin/editor-all', {
        email: JSON.parse(localStorage.getItem('authAdmin')).admin.email,
      },
        {
          headers: {
            authorization: localStorage.getItem('tokenAdmin')
          }
        }
      ).then((result) => {
        if (result.data.isAdmin) {
          setIsOwner(true)
          const newEditorData = []
          result.data.editors.map((item) => {
            newEditorData.push(item)
            return newEditorData;
          })
          setEditors(newEditorData)
        }
      })


    })
    alert(alertMessage)

  }




  return (
    <div>
      <MenuAdmin isLogin={localStorage.getItem("tokenAdmin") ? true : false} />

      <div className='container'>

        <div className='row' id='bgusers'>
          <h1>Editorler</h1>
        </div>

        <div className='row'>


          {editors && editors.length > 0 && editors.map((result, index) => {

            return (
              <div key={index || {}} className='col-lg-4 col-md-6 col-sm-12 mt-5 '>
                <Card style={{ width: '18rem', height: '20rem', }}>
                  <Card.Body>
                    <Card.Title >{result.name + ' ' + result.surname}</Card.Title>
                    <Card.Text>Email:  {result.email}</Card.Text>
                    <Card.Text>Kullanıcı Adı: {result.userName}</Card.Text>
                    <Card.Text>Cinsiyet: {result.gender}</Card.Text>
                    <Card.Text>Şehir: {result.city}</Card.Text>

                    <Button variant='danger' onClick={(e) => asyncHandleSubmit(result._id)} type='submit' style={{ marginTop: '30px', marginLeft: '70px', display: isOwner ? 'inline-block' : 'none' }}>Kullanıcıyı Sil</Button>

                  </Card.Body>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Editors