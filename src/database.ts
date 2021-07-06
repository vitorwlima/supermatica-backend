import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb+srv://supermaticaUser:RzROrV7cxlszoHjJ@supermatica.nzulz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('DB is up'))
.catch((err) => console.log(err))