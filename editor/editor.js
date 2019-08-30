Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...',
    _focus: false,
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    // 加载字体
    // wx.loadFontFace({
    //   family: 'Pacifico',
    //   source: 'url("https://sungd.github.io/Pacifico.ttf")',
    //   success: console.log
    // })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
    }).exec()
  },

  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },

  getFormats(e) {
    console.log(e)
  },
  insertImage() {
    const that = this

    // wx.chooseImage({
    //   count: 1, // 最多可以选择的图片张数，默认9
    //   sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
    //   sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
    //   success: function(res) {
    //     var path = res.tempFilePaths[0]
    //     console.log(res)
    //     console.log(path)
    //     wx.request({
    //       url: path,
    //       method: 'GET',
    //       responseType: 'arraybuffer',
    //       success: (res) => {
    //         let base64 = wx.arrayBufferToBase64(res.data);
    //         let userImageBase64 = 'data:image/jpg;base64,' + base64;
    //         console.log('----base64----')
    //         console.log(userImageBase64)
    //       }

    //     })
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })

    wx.chooseImage({
      success: res => {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
            const userImageBase64 = 'data:image/png;base64,' + res.data
            that.editorCtx.insertImage({
              src: userImageBase64,
              data: {
                id: 'abcd',
                role: 'god'
              },
              success: function () {
                console.log('insert image success')
              }
            })
          }
        })

        //以下两行注释的是同步方法，不过我不太喜欢用。
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)
      }
    })

    // wx.chooseImage({
    //   count: 1,
    //   success: function(res) {
    //     console.log(res)
    //     var path = res.tempFilePaths[0]
    //     console.log(res)
    //     console.log(path)
    //     wx.request({
          
    //       url: path,
    //       method: 'GET',
    //       responseType: 'arraybuffer',
    //       success: (res) => {
    //         let base64 = wx.arrayBufferToBase64(res.data);
    //         let userImageBase64 = 'data:image/jpg;base64,' + base64;
    //         console.log('----base64----')
    //         console.log(userImageBase64)
    //         that.editorCtx.insertImage({
    //           src: userImageBase64,
    //           data: {
    //             id: 'abcd',
    //             role: 'god'
    //           },
    //           success: function() {
    //             console.log('insert image success')
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
  },
  subEditor(){
    this.editorCtx.getContents({
      success(res){
        console.log(res)
      },
      fail(res){
        console.log(res)
      },
      complete(res){
        console.log(res)
      }
    })
  }
})