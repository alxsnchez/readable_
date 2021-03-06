import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { connect } from 'react-redux'
import { fetchComments,} from './actions/comments'
import { sortPosts } from './actions/ui'
import { fetchCategories } from './actions/categories'
import { fetchPosts } from './actions/posts'
import Modal from 'react-modal'
import PostCreateEdit from './components/PostCreateEdit'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {

  state = {
    modalIsOpen: false
  }

  componentDidMount() {
    this.props.loadPosts()
    this.props.loadComments()
    this.props.loadCategories()
  }

  render() {
    return (
      <div className='app'>
        <div className='wrapper'>
          <div className='main-content'>
            <Main />
          </div>
          <div className='sidebar-navigation'>
            <Sidebar open={this.openModal}/>
          </div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
              <PostCreateEdit close={this.closeModal}/>
          </Modal>
        </div>
      </div>
    );
  }

  

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }
}

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(fetchCategories()),
  loadPosts: () => dispatch(fetchPosts()),
  loadComments: () => dispatch(fetchComments()),
  sortPosts: (sorting) => dispatch(sortPosts(sorting))
})

export default connect(null, mapDispatchToProps, null, {pure:false})(App);
