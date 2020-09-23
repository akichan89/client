import React from 'react'
import {
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom'
import { Div } from 'glamorous'

import NewPostPage from './NewPostPage'
import LoginPage from './LoginPage'
import PostsPage from './../containers/PostsPage'
import PostPage from './../containers/PostPage'

const Routes = () => (
  <Div
    css={{
      padding: 20,
      backgroundColor: 'white',
      minHeight: 280,
    }}
  >
    <Switch>
      <Redirect exact path="/" to="/posts" />
      <Route path="/posts" exact component={PostsPage} />
      <Route path="/posts/:postId" component={PostPage} />
      <Route path="/submit" component={NewPostPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </Div>
)

export default Routes
