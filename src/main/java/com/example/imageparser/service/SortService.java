package com.example.imageparser.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class SortService {


    public static void mergeSort(int[] array) {
        if (array.length < 2) {
            return;
        }
        int mid = array.length / 2;
        int[] leftArray = Arrays.copyOfRange(array, 0, mid);
        int[] rightArray = Arrays.copyOfRange(array, mid, array.length);
        mergeSort(leftArray);
        mergeSort(rightArray);
        merge(leftArray, rightArray, array);
    }

    private static void merge(int[] leftArray, int[] rightArray, int[] result) {
        int leftIndex = 0, rightIndex = 0, resultIndex = 0;

        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            if (leftArray[leftIndex] <= rightArray[rightIndex]) {
                result[resultIndex++] = leftArray[leftIndex++];
            } else {
                result[resultIndex++] = rightArray[rightIndex++];
            }
        }
        while (leftIndex < leftArray.length) {
            result[resultIndex++] = leftArray[leftIndex++];
        }
        while (rightIndex < rightArray.length) {
            result[resultIndex++] = rightArray[rightIndex++];
        }
    }


}
