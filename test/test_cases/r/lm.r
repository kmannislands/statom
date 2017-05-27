drop <- read.dta("../data/drop120C.dta")

dropit <- glm(enrolled ~ midterm, family=binomial(logit), data=drop)

# summary block to quickly view the result of the regression
summary(dropit)

# it appears the midterm is statistically significant at the .1% level

# create a value for a failing exam
fail <- list(midterm = 0)

probEnrolled = predict(dropit, fail, type="response")
