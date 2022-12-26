/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Ad {
  /** AdID */
  AdID?: number;
  /**
   * Price
   * @min -2147483648
   * @max 2147483647
   */
  Price: number;
  /** CustomerID */
  CustomerID?: number | null;
  /**
   * Title
   * @minLength 1
   * @maxLength 120
   */
  Title: string;
  /**
   * Description
   * @maxLength 500
   */
  Description?: string | null;
  /**
   * Status
   * @maxLength 30
   */
  Status?: string;
  /**
   * CreationDate
   * @format date-time
   */
  CreationDate?: string;
  /**
   * SaleDate
   * @format date-time
   */
  SaleDate?: string | null;
  /** SellerID */
  SellerID: number;
  /** FlatID */
  FlatID: number;
}

export interface Basket {
  /** ID */
  id?: number;
  /** CustomerID */
  CustomerID: number;
  /** AdID */
  AdID: number;
  /**
   * Status
   * @minLength 1
   */
  Status: string;
}

export interface Customer {
  /** CustomerID */
  CustomerID?: number;
  /**
   * DateSignUp
   * @format date-time
   */
  DateSignUp?: string;
  /**
   * FirstName
   * @maxLength 30
   */
  FirstName?: string;
  /**
   * LastName
   * @maxLength 30
   */
  LastName?: string;
}

export interface ExpandedBasket {
  /** ID */
  id?: number;
  CustomerID?: {
    /** CustomerID */
    CustomerID?: number;
    /**
     * DateSignUp
     * @format date-time
     */
    DateSignUp?: string;
    /**
     * FirstName
     * @maxLength 30
     */
    FirstName?: string;
    /**
     * LastName
     * @maxLength 30
     */
    LastName?: string;
  };
  AdID?: {
    /** AdID */
    AdID?: number;
    /**
     * Price
     * @min -2147483648
     * @max 2147483647
     */
    Price: number;
    /**
     * Title
     * @minLength 1
     * @maxLength 120
     */
    Title: string;
    /**
     * Description
     * @maxLength 500
     */
    Description?: string | null;
    /**
     * Status
     * @maxLength 30
     */
    Status?: string;
    /**
     * CreationDate
     * @format date-time
     */
    CreationDate?: string;
    /**
     * SaleDate
     * @format date-time
     */
    SaleDate?: string | null;
    CustomerID?: {
      /** CustomerID */
      CustomerID?: number;
      /**
       * DateSignUp
       * @format date-time
       */
      DateSignUp?: string;
      /**
       * FirstName
       * @maxLength 30
       */
      FirstName?: string;
      /**
       * LastName
       * @maxLength 30
       */
      LastName?: string;
    };
    SellerID?: {
      /** SellerID */
      SellerID?: number;
      /**
       * DateSignUp
       * @format date-time
       */
      DateSignUp?: string;
      /**
       * FirstName
       * @maxLength 30
       */
      FirstName?: string;
      /**
       * LastName
       * @maxLength 30
       */
      LastName?: string;
      /**
       * Telephone
       * @maxLength 20
       */
      Telephone?: string | null;
    };
    FlatID?: {
      /** FlatID */
      FlatID?: number;
      /** Area */
      Area: number;
      /**
       * Address
       * @minLength 1
       * @maxLength 150
       */
      Address: string;
      /**
       * Floor
       * @min -2147483648
       * @max 2147483647
       */
      Floor: number;
      /** Balcony */
      Balcony: boolean;
      /**
       * YearBuilt
       * @min -2147483648
       * @max 2147483647
       */
      YearBuilt?: number | null;
      /**
       * BuildTech
       * @maxLength 30
       */
      BuildTech?: string | null;
      /** TypeID */
      TypeID: number;
    };
  };
  /**
   * Status
   * @minLength 1
   */
  Status: string;
}

export interface Flat {
  /** FlatID */
  FlatID?: number;
  /** Area */
  Area: number;
  /**
   * Address
   * @minLength 1
   * @maxLength 150
   */
  Address: string;
  /**
   * Floor
   * @min -2147483648
   * @max 2147483647
   */
  Floor: number;
  /** TypeID */
  TypeID: number;
  /** Balcony */
  Balcony: boolean;
  /**
   * YearBuilt
   * @min -2147483648
   * @max 2147483647
   */
  YearBuilt?: number | null;
  /**
   * BuildTech
   * @maxLength 30
   */
  BuildTech?: string | null;
}

export interface Seller {
  /** SellerID */
  SellerID?: number;
  /**
   * DateSignUp
   * @format date-time
   */
  DateSignUp?: string;
  /**
   * FirstName
   * @maxLength 30
   */
  FirstName?: string;
  /**
   * LastName
   * @maxLength 30
   */
  LastName?: string;
  /**
   * Telephone
   * @maxLength 20
   */
  Telephone?: string | null;
}

export interface Type {
  /** TypeID */
  TypeID?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 30
   */
  Name: string;
  /**
   * NumBedrooms
   * @min -2147483648
   * @max 2147483647
   */
  NumBedrooms: number;
}
