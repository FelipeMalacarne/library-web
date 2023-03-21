package com.demolib.springbootlibrary.entity;

import lombok.Data;

import javax.persistence.*;


@Table(name="book")
@Data
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="title")
    private String title;

    @Column(name="author")
    private String author;

    @Column(name="copies")
    private Integer copies;

    @Column(name="copies_available")
    private Integer copiesAvailable;

    @Column(name="category")
    private String category;

    @Column(name="description")
    private String description;

    @Column(name="img")
    private String img;
}