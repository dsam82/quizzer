package main

import (
	"backend/Config"
	"backend/Controllers"
	"backend/Models"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func main() {

	var err error

	if Config.DB, err = gorm.Open("postgres", Config.PostgresDbURL(Config.BuildDBConfig()).String()); err != nil {
		fmt.Println("error occured while connecting to Database", err.Error())
	}

	defer Config.DB.Close()

	Config.DB.AutoMigrate(&Models.User{}, &Models.Questions{}, &Models.Auth{})

	r := gin.Default()
	r.POST("/signup", Controllers.SignUp)
	r.POST("/signin", Controllers.Login)
	r.POST("/createQues", Controllers.CreateQuestion)
	r.GET("/getQues", Controllers.GetQuestion)

	r.Use(cors.Default())
	err = r.Run(":8080")
	if err != nil {
		return
	}

}
