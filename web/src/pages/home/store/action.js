import { fromJS } from "immutable";  //确保源sotre不被修改
import axios from "axios"; //ajax通讯

const changeList = (data) => ({
    type: 'get_writer_list',
    data: fromJS(data),
})

export const GetList = () => {
    return (dispatch) => {
        axios.get('https://www.easy-mock.com/mock/5ce4973e45fff35246fea95e/jianshu/writerList').then((res)=>{
            if ( res.data.success ) {
                dispatch(changeList(res.data.data))
            }
        })
    }
}

