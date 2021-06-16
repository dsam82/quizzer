package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB
var err error

//User model
type User struct {
	ID    uint   `json:"id"`
	fname string `json:"fname"`
	lname string `json:"lname"`
	// age      uint
	username string `json:"username"`
	email    string `json:"email"`
	password string `json:"password"`
	admin    bool   `json:"admin"`
}

type Topics struct {
	ID    uint   `json:"tid"`
	topic string `json:"topic"`
}

type Quiz struct {
	ID       uint   `json:"tid`
	topic    string `json:"topic"`
	num_quiz uint   `json:"qname"`
}

type Questions struct {
	ID       uint   `json:"qid"`
	question string `json:"question"`
	op1      string `json:"optionA"`
	op2      string `json:"optionB"`
	op3      string `json:"optionC"`
	op4      string `json:"optionD"`
	ans1     bool   `json:"answerA"`
	ans2     bool   `json:"answerA"`
	ans3     bool   `json:"answerA"`
	ans4     bool   `json:"answerA"`
	topic    string `json:"topic"`
	num_quiz uint   `json:"qnum"`
}

func SignUp(c *gin.Context) {
	var user, preUser, temp User

	c.BindJSON(&user)

	db.First(&temp)
	fmt.Println(temp)

	if err := db.Where("username = ?", user.username).First(&preUser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{user.username: "already exists. Try another"})
	} else if err := db.Where("email = ?", user.email).First(&preUser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(202, gin.H{user.email: "already exists. Try another"})
	} else {
		user.admin = false
		hashed, _ := bcrypt.GenerateFromPassword([]byte(user.password), 14)
		user.password = string(hashed)
		db.Create(&user)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	}
}

func Login(c *gin.Context) {
	var user, preUser User

	c.BindJSON(&user)

	fmt.Println(user)
	if err := db.Where("username = ?", user.username).First(&preUser).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{user.username: "doesn't exists."})
	} else {
		if err = bcrypt.CompareHashAndPassword([]byte(preUser.password), []byte(user.password)); err != nil {
			c.Header("access-control-allow-origin", "*")
			c.JSON(202, gin.H{user.username: "incorrect password"})
		} else {
			fmt.Println("aaaaaa")
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, preUser)
		}
	}
}

func GetTopics(c *gin.Context) {
	var topic []Topics
	if err := db.Find(&topic).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, topic)
	}

}

func main() {
	db, err = gorm.Open("sqlite3", "test.db")
	if err != nil {
		fmt.Println(err.Error())
		panic("Failed to connect to database")
	}
	defer db.Close()

	db.AutoMigrate(&User{}, &Topics{}, &Quiz{}, &Questions{})

	r := gin.Default()
	r.POST("/signup", SignUp)
	r.POST("/signin/", Login)

	r.GET("/topics", GetTopics)

	r.Use((cors.Default()))
	r.Run(":8080")
}
