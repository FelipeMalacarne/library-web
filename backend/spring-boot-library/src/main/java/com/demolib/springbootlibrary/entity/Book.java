package com.demolib.springbootlibrary.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="book")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_book")
    private Integer idBook;

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
}