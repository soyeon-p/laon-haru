import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import axios from 'axios';


//사이트의 example을 참고했습니다
export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      items: {}
    };
  }
  componentDidMount(){
    this.getDate()
  }
  getDate(){
    const API_KEY ="UWsaSf5JCiPhMQY2FItG62tXaljrXrnt731SR%2FC%2BfEem9RO1lcYhqAy0M1YPWY9KhFX%2FdEFM6U%2BeLvaZ2URGcQ%3D%3D"
    const YEAR = 2020;
    const HEIGHT = 50;
    //const MONTH
    //2020년 공휴일들 가져오는 url
    const url = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${API_KEY}&solYear=${YEAR}&_type=json&numOfRows=30`;

    axios.get(url).then((response)=>{
        const datas= response.data.response.body.items.item;
        const items = {}
        //js의 for of 문 찾아보세요
        if(datas.length>0){
          console.log("데이터 가져옴")
          for(let data of datas){
            let arr = []
            let datename = data.dateName
            //20200101을 2020-01-01로 변환
            let locdate = data.locdate.toString()
            let year = locdate.substring(0,4)
            let month = locdate.substring(4,6)
            let day = locdate.substring(6,8)
            let rename = `${year}-${month}-${day}`
            let nameobj = [{name : datename, height: HEIGHT}]
            arr.push(nameobj)
            //items에 기념일 추가
            items[rename] = nameobj 
          }
          this.setState({
            isLoading: false,
            items : items
        });
      }else{
        console.log("데이터 가져오기 실패")
      }
       
        
       
    })}
  

  render() {
    const {isLoading} = this.state
    if(isLoading){
        return(
          <View>
              <Text >
                Loading..
              </Text>
          </View>
        )
    }else{
      return (
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2020-02-17'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
        />
      );
    }
  }
  //임의로 아이템 생성
  loadItems(day) {
    //setTimeout은 Javascript의 비동기 처리를 공부해보시면 알 수 있습니다
    setTimeout(() => {
      //여기까지는 우선 데이터 베이스에 있는 api를 가져온 단계
      //따라서 items 객체에는 기념일 밖에 없다
      //일정이 없는 날자도 View를 리턴해야하기에, 빈 객체를 추가해준다
      
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        //위 로그와 아래로그의 아이템들을 비교해보세요
        //console.log(this.state.items)
        if (!this.state.items[strTime]){
          //setState를 사용하면 컴포넌트 리렌더링을 합니다
          //이는 react의 존재 이유에 어긋납니다 왜냐하면 react는 렌더링을 최소화하도록 설계되었기 때문입니다
          //setState를 사용하면 리렌더링을 100번 하겠죠?-> 비효율적
          this.state.items[strTime] = [];
        }
        //console.log(this.state.items)
      }
      //setState를 적용하기 위해서 newItems 객체 생성
      //keys forEach 문은 구글링을 통해 이해해보세요
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
        // console.log(key)
        // console.log(newItems[key])
      });
      this.setState({
        isLoading:false,
        items: newItems
      });
    }, 500);
  }  
  //아이템 뷰->이런 부분을 캘린더에 일정 추가 부분에 활용해주셔도 좋습니다
  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }



  //빈 날짜를 보여주는 뷰
  renderEmptyDate() {
    return (
      <TouchableOpacity
        style={[styles.item, {height: 50}]}
      >
        <Text>This is empty date!</Text>
      </TouchableOpacity>
    );
  }
  //줄이 바뀌었다고 알려주는 뷰
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});