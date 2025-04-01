const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot02187/",
            name: "springboot02187",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot02187/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "高校学生饮食推荐系统"
        } 
    }
}
export default base
