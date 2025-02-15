import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsEnum } from 'class-validator';
import { BoardCommentStatusEnum } from '~/type/enum/board-comment';
import { BoardModel, UserModel } from '~/database/model';

@Entity({ name: 'board_comment', comment: '게시판 댓글 테이블' })
export class BoardCommentModel {
  @PrimaryGeneratedColumn({ name: 'board_comment_seq', type: 'bigint', comment: 'boardCommentSeq' })
  boardCommentSeq: number;

  @Column({ name: 'user_seq', type: 'bigint', comment: 'userSeq' })
  userSeq: number;

  @Column({ name: 'board_seq', type: 'bigint', comment: 'boardSeq' })
  boardSeq: number;

  @Column({ type: 'varchar', length: 500, comment: '댓글 내용' })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: '생성일' })
  createdAt: Date;

  @Column({ name: 'status', type: 'varchar', length: 10, comment: '상태' })
  @IsEnum(BoardCommentStatusEnum)
  status: BoardCommentStatusEnum;

  @ManyToOne(() => UserModel, (user) => user.boardCommentList)
  @JoinColumn({ name: 'user_seq' })
  user: UserModel;

  @ManyToOne(() => BoardModel, (board) => board.comments)
  @JoinColumn({ name: 'board_seq' })
  board: BoardModel;
}
