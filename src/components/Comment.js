import React from 'react'
import glam, { Div } from 'glamorous'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import { Icon, Modal } from 'antd'

const { confirm } = Modal

const showDeleteConfirm = (
  username,
  commentId,
  deleteComment,
) => {
  confirm({
    title: 'Are you sure you want to delete this comment?',
    content: `Comment by ${username} will be deleted!`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      deleteComment(commentId, err => {
        if (err) {
          return console.error(err)
        }
      })
    },
  })
}

const DeleteButton = glam.span({ cursor: 'pointer' })

const CommentColumn = glam.div({
  display: 'flex',
  flexDirection: 'column',
  marginRight: 10,
})

const VoteIcon = glam(Icon)(
  {
    color: 'rgba(0,0,0,0.25)',
    cursor: 'pointer',
    ':hover': {
      color: 'rgba(0,0,0,0.5)',
    },
  },
  ({ inactive }) =>
    inactive && {
      color: 'white',
      cursor: 'not-allowed',
      ':hover': { color: 'white' },
    },
)

const Comment = props => {
  const {
    comment,
    deleteComment,
    canDelete,
    canVote,
    canUpvote,
    canDownvote,
    voteComment,
  } = props
  const {
    _id: commentId,
    text,
    author,
    voteScore = 0,
    createdAt,
  } = comment
  return (
    <Div css={{ display: 'flex', alignItems: 'center' }}>
      {canVote && (
        <CommentColumn>
          <VoteIcon
            onClick={() => voteComment(commentId, 1)}
            inactive={!canUpvote}
            type="caret-up"
          />
          <VoteIcon
            onClick={() => voteComment(commentId, -1)}
            inactive={!canDownvote}
            type="caret-down"
          />
        </CommentColumn>
      )}
      <CommentColumn>
        <Div>{text}</Div>
        <Div css={{ fontWeight: 'light', fontSize: 12 }}>
          {voteScore || 0} points | Commented by{' '}
          {author.username} |{' '}
          {DateTime.fromISO(createdAt).toLocaleString()} |{' '}
          {canDelete && (
            <DeleteButton
              onClick={() =>
                showDeleteConfirm(
                  author.username,
                  commentId,
                  deleteComment,
                )
              }
            >
              Delete
            </DeleteButton>
          )}
        </Div>
      </CommentColumn>
    </Div>
  )
}

export default Comment
