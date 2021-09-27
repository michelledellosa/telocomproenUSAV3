import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';  
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class BbddServiceProvider{
    db:SQLiteObject = null;
    constructor (
        private sQLite:SQLite,
        private storage:Storage,){}


    initDatabase(){
        // this.sQLite.create sirve para crear una db en caso de que no exista, y si existe va a recuperar la instancia
        this.sQLite.create({
            name:"data.db",
            location:"default"
        }) 
            .then(
                (data)=>{
                    alert("Base de Datos Disponible");
                    this.db =data;
                     
                    this.storage.get("dbExists")
                        .then((value)=>{
                            if(value==null){
                                alert("No Existe la variable");
                                this.createTable()
                        .then(
                            (data)=>{
                                alert("Tabla Creada");
                                this.storage.set("dbExists","1")
                                .then(()=>{
                                    alert("variable añadida");
                                })
                            }

                        )
                        .catch((error)=>{
                            alert("Error añadiendo tabla a la base de datos");
                        })
                                
                            }else{
                                alert("Existe la variable"+value);
  
                            }
                         })
                    

                }
            )
            .catch((error)=>{
                alert("Error abriendo base de datos");
            })
    }
    createTable(){ 
        let sql="CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, password INTEGER)";
        return this.db.executeSql(sql,[]);
    }

    insert(usuario:any){
        let sql="INSERT INTO usuario(user,password) VALUES (?,?)";
        return this.db.executeSql(sql, [usuario.user, usuario.password]);
    }
}
