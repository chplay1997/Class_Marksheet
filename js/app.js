var listScore =[];
var danhSachDiem = [{
        name:"Hoàng Nguyệt Mỵ Ly",
        math:10,
        physical: 10,
        chemistry: 10,
    },{
        name:"Đồng Thế Mác",
        math:9.9,
        physical: 9.8,
        chemistry: 9.7,
    },
    {
        name:"Nguyễn Thị Phúc Anh",
        math:6.5,
        physical: 7.7,
        chemistry: 4.6,
    },
    {
        name:"Cúc Tịnh Y",
        math:9,
        physical: 9.1,
        chemistry: 8.7,
    },
    {
        name:"Diệp Tâm Hạ",
        math:8.8,
        physical: 8.8,
        chemistry: 5.6,
    },
    {
        name:"Lê Văn Khoa",
        math:6.4,
        physical: 8.4,
        chemistry: 7.4,
    },
    {
        name:"Nguyễn Lê Hoàng Phi",
        math:7.4,
        physical: 6.4,
        chemistry: 9.4,
    },
    {
        name:"Mục Ninh Tuyết",
        math:8.3,
        physical: 8.9,
        chemistry: 7.1,
    },
    {
        name:"Lê Hoàng Ánh",
        math:8.0,
        physical: 9.8,
        chemistry: 7.6,
    },
    {
        name:"Hoàng Sở Kiều",
        math:8.6,
        physical: 5.2,
        chemistry: 7.7,
    },]

//khai báo biến chung
var table = document.getElementById("myTable");
var tr = document.getElementsByTagName("tr");
var formGroup = document.getElementsByClassName("form-group");
var formControl = document.getElementsByClassName("form-control");

$(document).ready(function(){
    //Thông báo nhập ô input
    $(".form-control").on("blur",isInvalid);
    $(".form-control").on("input",notInvalid);

    //cảnh báo chưa nhập ô input
    function isInvalid(event){
        if(event.target.value ==''){
            event.target.parentElement.parentElement.classList.add('invalid');
            event.target.parentElement.parentElement.getElementsByClassName("form-message")[0].innerHTML = "Bạn chưa nhập trường này !";
        }
    //Kiểm tra tính hợp lệ của điểm
        else if(event.target.value >10 || event.target.value<0){
            event.target.parentElement.parentElement.classList.add('invalid');
            event.target.parentElement.parentElement.getElementsByClassName("form-message")[0].innerHTML = "Trường này chưa hợp lệ !";
        }
    }

    //xóa cảnh báo ô input
    function notInvalid(event) {
        event.target.parentElement.parentElement.classList.remove('invalid');
        event.target.parentElement.parentElement.getElementsByClassName("form-message")[0].innerHTML = "";
    }

    //nhập bảng
    function addTable(list,dtb) {
        var row = table.insertRow(tr.length);
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        // Add some text to the new cells:
        cell1.innerHTML = tr.length-1;
        cell2.innerHTML = list.name;
        cell3.innerHTML = list.math;
        cell4.innerHTML = list.physical;
        cell5.innerHTML = list.chemistry;
        if(listScore[dtb]!=undefined) {
            cell6.innerHTML = list[dtb];
        }
        else {
            cell6.innerHTML = "?"; 
        }
    }

    //Nhập điểm
    $("#btn-1").on("click",addStudents);
    function addStudents () {
        var testScore = { 
            name: "",
            math: 0,
            physical: 0,
            chemistry: 0
        };

        //Kiem tra da nhap input chua
        var check=true;

        for(var i=0 ;i <formControl.length;i++){
            if(formControl[i].value =='' || formGroup[i].classList[1])
                check= false;
        }

        if(check){
            testScore.name = $("#name").val().trim();
            testScore.math = Number($("#math").val()).toFixed(1);
            testScore.physical = Number($("#physical").val()).toFixed(1);
            testScore.chemistry = Number($("#chemistry").val()).toFixed(1);
            listScore.push(testScore);
    
            addTable(testScore);

            //Xóa ô nhập
            $("#name").val("");
            $("#math").val("");
            $("#physical").val("");
            $("#chemistry").val("");
        }
        else {
            for(var i=0 ;i <formControl.length;i++) {
                if(formControl[i].value ==''){
                    formControl[i].parentElement.parentElement.classList.add('invalid');
                    formControl[i].parentElement.parentElement.getElementsByClassName("form-message")[0].innerHTML = "Bạn chưa nhập trường này !";
                }
            }
        }
        
    }

    //Nhập điểm nhanh
    $(".btn-fast").on("click",function(){
        var length = danhSachDiem.length;
        for(var i =0 ;i<length;i++){
            var newScore={};
            addTable(danhSachDiem[i]);
            newScore.name = danhSachDiem[i].name;
            newScore.math = danhSachDiem[i].math;
            newScore.physical = danhSachDiem[i].physical;
            newScore.chemistry = danhSachDiem[i].chemistry;
            listScore.push(newScore);
        }
    })

    //Tính điểm trung bình
    $("#btn-2").on("click",mediumScore);
    function mediumScore() {
        for(var i = 1,row;row = table.rows[i];i++){
            var sum =0;
            for(var j = 2,col;col = row.cells[j];j++){
                if(j<5){
                    var score = Number(col.innerHTML);
                    sum+=score;
                }
                else{
                    col.innerHTML = (sum/3).toFixed(1);
                    listScore[i-1].DTB = Number((sum/3).toFixed(1));
                }
            }
        }
    }

    //Bôi đỏ học sinh giỏi
    $("#btn-3").on("click",goodStudents);
    function goodStudents() {
        for(var i = 1,row;row = table.rows[i];i++){
            var score = Number(row.cells[5].innerHTML);
            if(score >=8.0)
                row.style.color= "red"; 
        }
    }

    //Delete table
    function onlyDeleteTable() {
        var i=listScore.length;
        while(i) {
            table.deleteRow(i);
            i--;
        }
    }

    //Sắp xếp
    $(".sort").on("click",function(){
        var typeSort= this["name"];
        if(listScore.length>0){
            if(listScore[0][typeSort] != undefined){
                var length = listScore.length;
                if(length!=0){
                    var isMediumScore= table.rows[1].cells[5].innerHTML != '?';
                }
                var isRed= false;
                for(var i=0;i<length;i++){
                    if(table.rows[i].getAttribute("style") == "color: red;")
                    {
                        isRed =true;
                        break;
                    }
                }
                onlyDeleteTable();
                
                if(typeSort == 'name') {
                    for(var i =0;i<length-1;i++){
                        for(var j=i+1;j<length;j++){
                            var ex=listScore[i];
                            var name1 = listScore[i].name.split(" ");
                            var name2 = listScore[j].name.split(" ");
                            name1=name1[name1.length-1];
                            name2=name2[name2.length-1];
        
                            if(name1[0].localeCompare(name2[0])==1){
                                listScore[i]=listScore[j];
                                listScore[j]=ex;
                            }
                        }
                    }
                }
                else {
                    for(var i =0;i<length-1;i++){
                        for(var j=i+1;j<length;j++){
                            var ex=listScore[i];
                            if(listScore[i][typeSort]>listScore[j][typeSort]){
                                listScore[i]=listScore[j];
                                listScore[j]=ex;
                            }
                        }
                    }
                }
                for(var i =0 ;i<length;i++){
                    addTable(listScore[i],"DTB");
                }
                if(isMediumScore){
                    mediumScore();
                }
                if(isRed){
                    goodStudents();
                }
            }
        }
    });


    //tìm kiếm
    $("#search").on("click",function() {
        var index=$(this).prev().val();
        if(index<1 || index>listScore.length)
            $(this).next().text("Không tìm thấy STT "+index);
        else
            table.rows[index].style = "background-color: #18e418;";
    });

    //chỉnh sửa
    $("#change").on("click",function(){
        var index = $(this).prev().val();
        if(index < 1 || index > listScore.length)
            $(this).next().text("Không tìm thấy STT "+index);
        else {
            $(".change-list-1").css("display","none");
            $(".change-list-2").css("display","block");
            $(".more-change").eq(0).val(index);
            $(".more-change").eq(1).val(listScore[index -1].name);
            $(".more-change").eq(2).val(listScore[index -1].math);
            $(".more-change").eq(3).val(listScore[index -1].physical);
            $(".more-change").eq(4).val(listScore[index -1].chemistry);
            $(".more-change").eq(5).val(listScore[index -1].DTB?listScore[index -1].DTB:"?");
        }
        var lengthData = $(".more-change").length;
        for(var i=1;i<lengthData;i++){
            $(".more-change").eq(i).attr("name",i);
            $(".more-change").eq(i).on('blur', function (){
                if(this.value ==''){
                    this.classList.add('invalid');
                    $(".change-message").eq(this.name).text("Bạn chưa nhập trường này !");
                }
                //Kiểm tra tính hợp lệ của điểm
                else if(this.value >10 || this.value<0){
                    this.classList.add('invalid');
                    $(".change-message").eq(this.name).text("Trường này chưa hợp lệ !");
                }
            });
            $(".more-change").eq(i).on('input', function (){
                this.classList.remove('invalid');
                $(".change-message").eq(this.name).text("");
            });
        }
    
    
    //Bấm nút khi hoàn thành
    $("#complete").on("click",function(){
        var check=true;
        for(var i=0 ;i <lengthData;i++){
            if( $(".more-change").eq(i).val() =='' || $(".more-change").eq(i).attr("class").includes("invalid"))
                check= false;
        }
        if(check){
            var index =  $(".more-change:first").val() - 1;
            listScore[index].name= ($(".more-change").eq(1).val()).replace(/\s+/g, ' ').trim();
            listScore[index].math= Number($(".more-change").eq(2).val()).toFixed(1);
            listScore[index].physical= Number($(".more-change").eq(3).val()).toFixed(1);
            listScore[index].chemistry= Number($(".more-change").eq(4).val()).toFixed(1);
                var length = listScore.length;
                if(length!=0){
                    var isMediumScore= table.rows[1].cells[5].innerHTML != '?';
                }
                var isRed= false;
                for(var i=0;i<length;i++){
                    if(table.rows[i].getAttribute("style") == "color: red;")
                    {
                        isRed =true;
                        break;
                    }
                }
                onlyDeleteTable();
                for(var i =0 ;i<length;i++){
                    addTable(listScore[i],"DTB");
                }
                if(isMediumScore){
                    mediumScore();
                }
                if(isRed){
                    goodStudents();
                }
                table.rows[index+1].style = "background-color: rgba(163, 163, 42, 0.397);";
                $(".change-list-1").css("display","block");
                $(".change-list-2").css("display","none");
        }
    });
}); 

//Xoa bang
$("#deleteTable").on("click",function(){
    var index=$(this).prev().val();
    if(index < 1 || index > listScore.length)
        $(this).next().text("Không tìm thấy STT " + index);
    else {
        var length = listScore.length;
        if(length!=0){
            var isMediumScore= table.rows[1].cells[5].innerHTML != '?';
        }
        var isRed= false;
        for(var i=0;i<length;i++){
            if(table.rows[i].getAttribute("style") == "color: red;")
            {
                isRed =true;
                break;
            }
        }
        onlyDeleteTable();
        listScore.splice(index-1,1);
        var length= listScore.length;
        for(var i =0 ;i<length;i++){
            addTable(listScore[i],"DTB");
        }
        if(isMediumScore){
            mediumScore();
        }
        if(isRed){
            goodStudents();
        }
        $(this).next().text("Đã xóa STT " + index);
    }
});

//Xóa tất cả
$("#deleteAllTable").on("click",deleteAll)
function deleteAll(){
    onlyDeleteTable();
    var length = listScore.length;
    listScore.splice(0,length);
}

});
