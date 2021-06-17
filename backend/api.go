package main

import (
	"fmt"
	"quiz/Config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB
var err error

//User model
type User struct {
	ID       uint   `json:"id"`
	Fname    string `json:"fname"`
	Lname    string `json:"lname"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Tutor    bool   `json:"tutor"`
}

type Topics struct {
	ID    uint   `json:"tid"`
	Topic string `json:"topic"`
}

type Quiz struct {
	ID    uint   `json:"qid"`
	Qname uint   `json:"qname"`
	Topic string `json:"topic"`
}

type Questions struct {
	ID       uint   `json:"qid"`
	Question string `json:"question"`
	Op1      string `json:"optionA"`
	Op2      string `json:"optionB"`
	Op3      string `json:"optionC"`
	Op4      string `json:"optionD"`
	Ans1     bool   `json:"answerA"`
	Ans2     bool   `json:"answerB"`
	Ans3     bool   `json:"answerC"`
	Ans4     bool   `json:"answerD"`
	Topic    string `json:"topic"`
	Num_quiz uint   `json:"qnum"`
}

func SignUp(c *gin.Context) {
	var user, preUser, temp User

	c.BindJSON(&user)

	db.First(&temp)
	fmt.Println(temp)

	if err := db.Where("username = ?", user.Username).First(&preUser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{user.Username: "already exists. Try another"})
	} else if err := db.Where("email = ?", user.Email).First(&preUser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(202, gin.H{user.Email: "already exists. Try another"})
	} else {
		user.Tutor = false
		hashed, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
		user.Password = string(hashed)
		db.Create(&user)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	}
}

func Login(c *gin.Context) {
	var user, preUser User

	c.BindJSON(&user)

	fmt.Println(user)
	if err := db.Where("username = ?", user.Username).First(&preUser).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{user.Username: "doesn't exists."})
	} else {
		if err = bcrypt.CompareHashAndPassword([]byte(preUser.Password), []byte(user.Password)); err != nil {
			c.Header("access-control-allow-origin", "*")
			c.JSON(202, gin.H{user.Username: "incorrect password"})
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

func GetQuizzes(c *gin.Context) {
	var quizzes []Quiz
	if err := db.Find(&quizzes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quizzes)
	}
}

func main() {
	// db, err = gorm.Open("sqlite3", "test.db")
	// Config.DB, err = gorm.Open("mysql", Config.MySQLDbURL(Config.BuildDBConfig()))
	Config.DB, err = gorm.Open("postgres", Config.PostgresDbURL(Config.BuildDBConfig()).String())
	db = Config.DB
	if err != nil {
		fmt.Println(err.Error())
		panic("Failed to connect to database")
	}
	defer Config.DB.Close()

	Config.DB.AutoMigrate(&User{}, &Topics{}, &Quiz{}, &Questions{})

	r := gin.Default()
	r.POST("/signup", SignUp)
	r.POST("/signin/", Login)

	r.GET("/topics/", GetTopics)
	r.GET("/quizzes/", GetQuizzes)

	r.Use((cors.Default()))
	r.Run(":8080")
}
