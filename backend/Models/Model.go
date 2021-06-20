package Models

type User struct {
	ID       uint   `gorm:"PRIMARY_KEY;AUTO_INCREMENT;NOT NULL" json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Tutor    bool   `json:"tutor"`
}

type Topics struct {
	ID    uint   `gorm:"PRIMARY_KEY;AUTO_INCREMENT;NOT NULL" json:"tid"`
	Topic string `json:"topic"`
}

type Auth struct {
	ID       uint   `gorm:"PRIMARY_KEY;AUTO_INCREMENT;NOT NULL"`
	Username string `json:"username"`
	Token    string `json:"token"`
}

type Quiz struct {
	ID    uint   `gorm:"PRIMARY_KEY;AUTO_INCREMENT;NOT NULL" json:"qid"`
	Qname uint   `json:"qname"`
	Topic string `json:"topic"`
}

type Questions struct {
	ID       uint   `gorm:"PRIMARY_KEY;AUTO_INCREMENT;NOT NULL"`
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
}
